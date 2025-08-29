import Api from "./api";

const BookingService = {
    getBookings: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();
            const response = await Api.get('/admin/bookings');

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createBooking: async (bookingData) => {
        try {
            const response = await Api.post('/admin/bookings', bookingData);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBooking: async (bookingId, bookingData) => {
        try {
            const response = await Api.put(`/admin/bookings/${bookingId}`, bookingData);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteBooking: async (bookingId) => {
        try {
            const response = await Api.delete(`/admin/bookings/${bookingId}`);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBookingStatus: async (bookingId) => {
        try {
            const response = await Api.put(`/admin/bookings/${bookingId}/status`);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default BookingService;