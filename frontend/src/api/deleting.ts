import axios from 'axios';

const deleting = async (id: string) => {

    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            'http://localhost:5000/api/delete',
            {
                id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('✅ 成功:', res.data.message);

    } catch (error: any) {
        console.log('❌ 通信エラー:', error.message);
    }
};

export default deleting