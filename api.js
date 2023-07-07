import express from 'express'
import {readdir,lstat} from 'fs/promises'
import { assets_dir } from './env.js'
export const router = express.Router()

router.get('/',(req,res)=>{
    return res.json({
        message: "Hello World!"
    })
})

router.get('/repo',async (req,res)=>{
    const repos = await readdir(assets_dir)
    return res.json({
        repos
    })
})

router.get('/repo/:repo',async (req,res)=>{
    const repo = req.params.repo
    const dirs = await readdir(assets_dir+'/'+repo)
    return res.json({
        repo,
        dirs
    })
})

router.get('/repo/:repo/:dir',async (req,res)=>{
    const repo = req.params.repo
    const dir = req.params.dir
    const subdirs = await readdir(assets_dir+'/'+repo+'/'+dir)
    return res.json({
        repo,
        dir,
        subdirs
    })
})

router.get('/repo/:repo/:dir/:subdir',async (req,res)=>{
    const repo = req.params.repo
    const dir = req.params.dir
    const subdir = req.params.subdir
    let is_404 = false
    let items = []
    const isdir = (await (lstat(assets_dir+'/'+repo+'/'+dir+'/'+subdir))).isDirectory()
    if(isdir){
        items = await readdir(assets_dir+'/'+repo+'/'+dir+'/'+subdir)
    }
    else{
        is_404 = true
    }
    return res.status(is_404?404:200).json({
        repo,
        dir,
        subdir,
        items
    })
})

export default router