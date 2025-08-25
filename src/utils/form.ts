export const onInvalidSubmit = (errors: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 ~ Fields Errors', errors);
  }
};
