import axios from 'axios';

export const deleteTask = async (id: string | string[]

): Promise<void> => {
    try {
        const response = await axios.delete(`http://192.168.100.114:8000/deleteTask/${id}`);
        console.log('Task deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

