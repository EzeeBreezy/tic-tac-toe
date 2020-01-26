import React from 'react'
import { Cell } from './Cell'

export const SmallField = () => {
    return (
        <table className='SmallField'>
            <tr>
                <td><Cell /></td>
                <td><Cell /></td>
                <td><Cell /></td>
            </tr>
            <tr>
                <td><Cell /></td>
                <td><Cell /></td>
                <td><Cell /></td>
            </tr>
            <tr>
                <td><Cell /></td>
                <td><Cell /></td>
                <td><Cell /></td>
            </tr>
        </table>
    )
}