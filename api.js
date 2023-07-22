import express from 'express'
import {readdir,lstat} from 'fs/promises'
import { assets_dir } from './env.js'
export const router = express.Router()

const show_subdir = async (path)=>{
    let isdir = false;
    let dir_items = [];
    try {
        isdir = (await (lstat(path))).isDirectory()
    }
    catch(e){
        console.log(`Could not read path ${path}\n${e}`)
    }
    if(isdir){
        dir_items = await readdir(path)
    }
    return dir_items
}

router.get('/',(req,res)=>{
    return res.json({
        message: "Hello World!"
    })
})

router.get('/repo',async (req,res)=>{
    const repos = await show_subdir(assets_dir)
    return res.json({
        repos
    })
})

router.get('/repo/:repo',async (req,res)=>{
    const repo = req.params.repo
    const dirs = await show_subdir(assets_dir+'/'+repo)
    return res.json({
        repo,
        dirs
    })
})

router.get('/repo/:repo/:dir',async (req,res)=>{
    const repo = req.params.repo
    const dir = req.params.dir
    const subdirs = await show_subdir(assets_dir+'/'+repo+'/'+dir)
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
    let items = await show_subdir(assets_dir+'/'+repo+'/'+dir+'/'+subdir)
    return res.status(is_404?404:200).json({
        repo,
        dir,
        subdir,
        items
    })
})

export default router