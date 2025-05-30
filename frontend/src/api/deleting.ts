import axios from 'axios';

const deleting = async (props: string) => {

    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            'http://localhost:5000/api/delete',
            {
                props,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('✅ 成功:', res.data.message);
        return true
    } catch (error: any) {
        console.log('❌ 通信エラー:', error.message);
        return false
    }
};

export default deleting