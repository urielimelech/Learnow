import React, {useEffect} from 'react'
import lagRadar from './LagRadar'

export const Loading = () => {

    useEffect(() =>
        lagRadar({
            frames: 60, // number of frames to draw, more = worse performance
            speed: 0.0017, // how fast the sweep moves (rads per ms)
            size: 300, // outer frame px
            inset: 3, // circle inset px
            parent: document.body // DOM node to attach to
    }),[])

    return null
}