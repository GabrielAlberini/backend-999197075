interface ResToClient {
  success: boolean
  status: number
  message: string
  data?: object | object[]
}

const createResToClient = (
  success: boolean,
  status: number,
  message: string,
  data?: any
) => {
  const r: ResToClient = { success, status, message };
  if (data) r.data = data;
  return r;
};

export { createResToClient };