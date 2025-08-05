import Api from "./api";

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
    },

    updateField: async (fieldId, fieldData) => {
        try {
            const response = await Api.put(`/admin/fields/${fieldId}`, fieldData);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteField: async (fieldId) => {
        try {
            const response = await Api.delete(`/admin/fields/${fieldId}`);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateFieldStatus: async (fieldId) => {
        try {
            const response = await Api.put(`/admin/fields/${fieldId}/status`);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default FieldService;