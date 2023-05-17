import { instance } from 'common/constants'
import { InstanceDataType } from 'modules/loginModule'
import { AxiosResponse } from 'axios'

export const chatsApi = {
	checkNumber(phoneNumber: number, instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.post<'', AxiosResponse<{
			existsWhatsapp: boolean
		}>, { phoneNumber: number }>(`waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`, { phoneNumber })
			.then(res => res.data)
	}
}