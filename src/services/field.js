import Api from "./api";

const FieldService = {
    getFields: async (filters = {}) => {
        try {

            const queryParams = new URLSearchParams();

            if (filters.name && filters.name.trim()) {
                queryParams.append('filter[name]', filters.name.trim());
            }

            if (filters.type && filters.type.trim()) {
                queryParams.append('filter[type]', filters.type);
            }

            if (filters.status && filters.status.trim()) {
                queryParams.append('filter[status]', filters.status);
            }

            const queryString = queryParams.toString();
            const url = queryString ? `/admin/fields?${queryString}` : '/admin/fields';

            const response = await Api.get(url);

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