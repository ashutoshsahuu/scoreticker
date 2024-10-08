import React from 'react'

const Scoreboard = () => {
    return (
        <main className='w-[70%] mx-auto p-4 bg-white rounded mt-6'>
            <div className='flex gap-4 items-center'>
                <div>
                    <img 
                    className='w-20 h-20 object-cover rounded-md'
                     src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW5kaWFuJTIwUHJlbWllZXIlMjBsZWFndWUlMjBsb2dvfGVufDB8fDB8fHww" alt="" />
                </div>
                <div className=' italic'>
                    <h1 className='text-2xl font-bold'>Match 1</h1>
                    <p>Indian Premier League</p>
                </div>
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg mt-4 overflow-hidden">
                <thead className="bg-blue-100">
                    <tr className='bg-gradient-to-b from-sky-500 to-indigo-500'>
                        <th className="text-left px-4 py-2 border-l-0 border-r-0">
                            Batsman
                        </th>
                        <th className="text-center px-2 py-2 border-l-0 border-r-0">R</th>
                        <th className="text-center px-2 py-2 border-l-0 border-r-0">B</th>
                        <th className="text-center px-2 py-2 border-l-0 border-r-0">4s</th>
                        <th className="text-center px-2 py-2 border-l-0 border-r-0">6s</th>
                        <th className="text-center px-2 py-2 border-l-0 border-r-0">SR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Rohit
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-white via-white via-5% to-neutral-200'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">
                            Sss
                            <br />
                            <span className="text-sm text-gray-500">not out</span>
                        </td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0</td>
                        <td className="border-t text-center border-l-0 border-r-0">0.00</td>
                    </tr>
                    <tr className='bg-gradient-to-b from-fuchsia-500 to-pink-500 font-semibold'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">Extras</td>
                        <td
                            colSpan="5"
                            className="border-t text-center text-sm border-l-0 border-r-0 "
                        >
                            0 B, 0 LB, 0 WD, 0 NB
                        </td>
                    </tr>
                    <tr className='bg-gradient-to-b from-yellow-400 to-orange-600 font-bold text-xl'>
                        <td className="border-t px-4 py-2 border-l-0 border-r-0">Total</td>
                        <td
                            colSpan="5"
                            className="border-t text-center border-l-0 border-r-0"
                        >
                            147-4 (20.0)
                        </td>
                    </tr>
                </tbody>
            </table>
        </main >
    )
}

export default Scoreboard