import React from 'react'
import { Cell } from './Cell'

export const SmallField = () => {
    return (
        <table>
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
            <tr>
                <Cell />
                <Cell />
                <Cell />
            </tr>
        </table>
    )
}