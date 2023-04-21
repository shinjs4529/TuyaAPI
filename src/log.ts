import { TuyaContext } from '@tuya/tuya-connector-nodejs'

const context = new TuyaContext({
	baseUrl: 'https://openapi.tuyain.com',
	accessKey: 'e8kuyeam533eaf44jpfp',
	secretKey: 'ed48413d0f494224954c3a896c4e8450',
})

const main = async () => {
	// Define the device ID
	const device_id = "d7819b5e6829482f25hjna"
	// Send commands
	/**
	 * reference:
	 * https://developer.tuya.com/en/docs/cloud/cbea13f274?id=Kalmcohrembze
	 */
	let time_start = new Date()
	time_start.setTime(time_start.getTime() - 12 * 60 * 60 * 1000)
	const time_end = new Date()
	const types = '1,2,3'
	console.error(`time_start: ${time_start.getTime()}, time_end: ${time_end.getTime()}, types: ${types}`)
	const commands = await context.request({
		path: `/v1.0/iot-03/devices/${device_id}/logs?event_types=${types}&start_time=${time_start.getTime()}&end_time=${time_end.getTime()}`,
		method: 'GET',
	})
	if (!commands.success) {
		new Error()
	}
	console.log("Execution result:", commands)
	const result = commands.result as JSON
	result['list'].forEach(e => {
		console.log("list items:", e)
		let event_time = new Date(e['event_time'])
		console.log("event_time:", event_time.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }))
	})
}
main().catch(err => {
	console.log(err)
})
