import { useCollection } from './useCollection'
// import { useEffect, useState } from 'react'
import { useFirestore } from './useFirestore'


export const useCategory = () => {

    const { addDocument, response } = useFirestore('category')

    const _categoryObj = [
        {
            title: "Wall Decors",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg1trans.png?alt=media&token=bd50aad5-c120-4cfd-a773-245fb9b0b49a",
            color: "#5e5eff"
        },{
            title: "Earrings",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg2trans.png?alt=media&token=9f564ed3-d274-4b38-8ea0-a1490e3d29fd",
            color: "#c368c3"
        },{
            title: "Sandals",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg3trans.png?alt=media&token=14cc4a5f-bb9a-42e7-bc77-a8eb19177039",
            color: "#daae5e"
        },{
            title: "Handbags",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg4trans.png?alt=media&token=7e1ed56b-e59f-4ec8-a9b8-a1a630590367",
            color: "#e4e4c5"
        },{
            title: "Coasters",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg5trans.png?alt=media&token=67926f07-9301-4f28-9a15-6711a4a90d88",
            color: "#a2cd61"
        },{
            title: "Bookmarks",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg6trans.png?alt=media&token=05868ac1-10f7-47af-8c46-719fe0c14a83",
            color: "#ea8bd4"
        },{
            title: "Plant Hangers",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg7trans.png?alt=media&token=4a0e177b-d0f6-4231-aed3-e87def12849c",
            color: "#da6969"
        },{
            title: "Curtain Ties",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg8trans.png?alt=media&token=f1f3a872-d2d2-4edb-8bea-257e4072dabb",
            color: "#cc96d1"
        },{
            title: "Door Wreaths",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg9trans.png?alt=media&token=ee2daa7c-9481-4077-af0f-0a6cf4e58d14",
            color: "#d1ceb3"
        },{
            title: "Napkin Holders",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg10trans.png?alt=media&token=764f6277-ded1-4df1-984d-869a2e3e30e4",
            color: "#8ed3dc"
        },{
            title: "Pairs",
            url: "https://firebasestorage.googleapis.com/v0/b/knotsoflove-e01b9.appspot.com/o/category%2Fcatimg11trans.png?alt=media&token=859064d0-c71d-416f-8290-0ce1e69241a6",
            color: "#d4dc8e"
        }
    ]

    // useEffect(() => {
    //     _categoryObj.forEach(cat => {
    //         console.log(cat);
    //         addDocument(cat)
    //     })
    // }, []);
    

    const { documents: showcase, isPending, error } = useCollection('showcase')

    

    // console.log(documents);
    


    // useEffect(() => {
    //     if(documents){
    //         // mapCatObjToDocuments(documents)
    //         // let ret = []
    //         // _categoryObj.map(catobj => {
    //         //     documents.map(doc => {
    //         //         // console.log(catobj.id, doc.categoryID);
    //         //         if(catobj.id === doc.categoryID){
    //         //             // console.log(doc.url);
    //         //             ret.push({
    //         //                 ...catobj, 
    //         //                 img: doc.url, 
    //         //                 color: doc.color, 
    //         //                 title: doc.title
    //         //             })
    //         //         }else{
    //         //             ret.push({...catobj})
    //         //         }
    //         //     })
    //         // })
    //         // setCategoryObj(ret)
    //     }
    // }, [documents]);
    

    return { showcase, isPending, error }
}
