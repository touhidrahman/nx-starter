import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const calculateTime = (timestamp: number) => {
    const currentTime = dayjs()
    const responseDataTime = dayjs(timestamp)
    const timeDifference = currentTime.diff(responseDataTime)
    const minutesDifference = dayjs.duration(timeDifference).as('minutes')
    return minutesDifference
}
