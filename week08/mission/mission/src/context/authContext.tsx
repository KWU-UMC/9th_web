import { createContext, useContext, type PropsWithChildren } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "../types/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { postSignin, postSignout, getUser } from "../apis/auth";
import type { useMeResponse } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  user: useMeResponse["data"] | null;
  isLoadingUser: boolean;
  login: (signInData: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (access: string, refresh: string, name?: string) => void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: accessToken, setStoredValue: setAccessToken } =
    useLocalStorage("accessToken");
  const { value: refreshToken, setStoredValue: setRefreshToken } =
    useLocalStorage("refreshToken");
  const { value: name, setStoredValue: setName } = useLocalStorage("name");
  const queryClient = useQueryClient();

  // user 정보 가져오기
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      return response.data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // 로그인 
  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      if (data.data.name) {
        setName(data.data.name);
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // 로그아웃 
  const logoutMutation = useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      setAccessToken(null);
      setRefreshToken(null);
      setName(null);
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  const login = async (signInData: LoginRequest) => {
    await loginMutation.mutateAsync(signInData);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const setTokens = (access: string, refresh: string, name?: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    if (name) {
      setName(name);
    }
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        name,
        user: user || null,
        isLoadingUser,
        login,
        logout,
        setTokens,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
