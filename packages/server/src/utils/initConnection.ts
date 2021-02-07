// Modules
import { createConnection } from 'typeorm';

export const initConnection = async () => {
  await createConnection();
};
