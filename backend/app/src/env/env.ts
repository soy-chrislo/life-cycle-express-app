interface Env {
	jwtSecret: string;
}

const env: Env = {
	jwtSecret: "hola123",
};

export { env };
