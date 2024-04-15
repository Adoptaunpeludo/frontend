import { verifyEmail } from '../authService';

export const loader = async ({ params }) => {
  try {
    const { token } = params;
    const res = await verifyEmail(token);
    if (res.status === 200) {
      return {
        success: true,
        message: res?.data?.message,
      };
    }
    throw new Error(res.response.data.message);
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
