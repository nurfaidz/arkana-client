import Api from "./api";

const token = localStorage.getItem('token');

const FieldService = {
    getFields: async () => {
        try {
            const response = await Api.get('/admin/fields');

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createField: async (fieldData) => {
        try {
            const response = await Api.post('/admin/fields', fieldData);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default FieldService;