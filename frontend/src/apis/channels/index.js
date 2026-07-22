import axios from '@/config/axios.config';

export const getChannelById = async ({ channelId, token }) => {
    try {
        const response = await axios.get(`/channels/${channelId}`,
            {
                headers: {
                    'x-access-token': token
                }
            }
        );

        return response?.data;
    } catch(error) {
        console.log('API Request Error in Channels while fetching channel details: ', error);
        throw error?.response?.data;
    }
};

export const getPaginatedMessages = async ({ channelId, token, limit, offset }) => {
    try {
        const response = await axios.get(`/messages/${channelId}`, {
            params: {
                limit: limit || 20,
                page: offset || 1
            },
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error in Channels while fetching Paginated Message details: ', error);
        throw error?.response?.data;
    }
};