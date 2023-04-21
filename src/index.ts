import { TuyaContext } from '@tuya/tuya-connector-nodejs'

const context = new TuyaContext({
	baseUrl: 'https://openapi.tuyain.com',
	accessKey: 'e8kuyeam533eaf44jpfp',
	secretKey: 'ed48413d0f494224954c3a896c4e8450',
})

const main = async () => {
	// Define the device ID
	const device_id = "d7819b5e6829482f25hjna1"
	// Query device details
	const devicedetail = await context.device.detail({
		device_id: device_id,
	})
	if (!devicedetail.success) {
		new Error()
	}
	console.log("Device details:", devicedetail)
	// Send commands
	/**
	 * reference:
	 * https://developer.tuya.com/en/docs/iot/device-control-best-practice-nodejs?id=Kaunfr776vomb
	 */
	const commands = await context.request({
		path: `/v1.0/iot-03/devices/${device_id}/status`,
		method: 'GET',
	})
	if (!commands.success) {
		new Error()
	}
	console.log("Execution result:", commands)
}
main().catch(err => {
	console.log(err)
})
