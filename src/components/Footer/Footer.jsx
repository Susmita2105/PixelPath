
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-cyan-100 border border-t-2 border-t-black">
        <div className="flex h-full flex-col ">
            <div className="mb-0 inline-flex justify-center items-center">
                <Logo width="100px" />
            </div>
            <div>
                <p className="text-sm text-gray-600 text-center justify-center">
                    &copy; Copyright 2024. All Rights Reserved by SusUI.
                </p>
            </div>
        </div>
    </section>
  )
}

export default Footer

