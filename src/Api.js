import React, { useEffect, useState } from 'react'
import axios from 'axios'
let launchesTimeData = []

function Api() {
    const [launchDateTimes, setLaunchDateTimes] = useState([])
    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async () => {
        await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo").then(res => {
            const launchesTimezone = res.data['Time Series (5min)']
            Object.getOwnPropertyNames(launchesTimezone).sort().forEach((val) => {
                launchesTimeData.push({ ...launchesTimezone[val], dateTime: val })
            })
            const launchDateTimes = Object.getOwnPropertyNames(launchesTimezone)
            setLaunchDateTimes(launchDateTimes)
        })
    }
    return (
        <div>
            <table className='Border'>
                <thead className='Head'>
                    <tr>
                        <th>DateTime</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {launchesTimeData && launchesTimeData.length > 0 && launchesTimeData.map((data, index) => (
                        <tr key={index} className="Value">
                            <td>{data['dateTime']}</td>
                            <td>{data['1. open']}</td>
                            <td>{data['2. high']}</td>
                            <td>{data['3. low']}</td>
                            <td>{data['4. close']}</td>
                            <td>{data['5. volume']}</td>
                        </tr>
                    )
                    )}
                </tbody>


            </table>
        </div>
    )
}
export default Api;