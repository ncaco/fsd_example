
import { useNavigate } from 'react-router-dom';
import React from 'react';

const MenuListPage: React.FC = () => {

    const navigate = useNavigate();

    // 예시용 sn (실제 데이터에 맞게 수정)
    const exampleSn = 1;

    const goToCreate = () => {
        navigate('/a/menu', { state: { pgMode: 'create' } });
    };

    const goToEdit = () => {
        navigate('/a/menu', { state: { pgMode: 'edit', sn: exampleSn } });
    };

    const goToShow = () => {
        navigate('/a/menu', { state: { pgMode: 'show', sn: exampleSn } });
    };

    return (
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button onClick={goToCreate}>등록</button>
            <button onClick={goToEdit}>수정(예시)</button>
            <button onClick={goToShow}>상세(예시)</button>
        </div>
    );
};

export default MenuListPage;

