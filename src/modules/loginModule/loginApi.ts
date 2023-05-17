import { InstanceDataType, ResponseLoginType } from 'modules/loginModule/types'
import { instance } from 'common/constants'

export const loginApi = {
	login(instanceData: InstanceDataType) {
		const {idInstance, apiTokenInstance} = instanceData
		return instance.get<ResponseLoginType>(`waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
			.then(res => res.data)
	}
}