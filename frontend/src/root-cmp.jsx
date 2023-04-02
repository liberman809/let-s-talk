import React from 'react'
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import {Index} from './pages/index'

export function RootCmp() {

    return <section>

        <main className='mainApp'>
            <Routes>
                <Route path='/' element={<Index />} />
            </Routes>
        </main>
    </section>
}


