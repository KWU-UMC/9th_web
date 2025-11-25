import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../apis/auth';

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signupData = { email, password, name }; 

    try {
      await signupUser(signupData);

      alert('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. (이메일 중복 또는 규칙 오류)');
    }
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <h1>회원가입</h1>

      <div>
        <label>이메일: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </div>

      <div>
        <label>이름: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
      </div>

      <div>
        <label>비밀번호: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password (8자 이상)"
        />
      </div>
      <button type="submit">회원가입</button>

      <p>
        이미 계정이 있나요? <Link to="/login">로그인하기</Link>
      </p>
    </form>
  );
};

export default SignupPage;