import React from 'react'
import { SmallField } from './SmallField'

export const BigField = () => {
    return (
        <table className='BigField'>
        <tr>
            <td><SmallField /></td>
            <td><SmallField /></td>
            <td><SmallField /></td>
        </tr>
        <tr>
            <td><SmallField /></td>
            <td><SmallField /></td>
            <td><SmallField /></td>
        </tr>
        <tr>
            <td><SmallField /></td>
            <td><SmallField /></td>
            <td><SmallField /></td>
        </tr>
    </table>
    )
}