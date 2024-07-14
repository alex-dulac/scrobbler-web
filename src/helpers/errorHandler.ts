const handleError = (error: any, message: string): never => {
    console.error(message, error);
    throw error;
};

export default handleError;