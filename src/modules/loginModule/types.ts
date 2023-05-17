export type InstanceDataType = {
	idInstance: string
	apiTokenInstance: string
}

export type ResponseLoginType = {
	stateInstance: 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode ' | 'starting'
}