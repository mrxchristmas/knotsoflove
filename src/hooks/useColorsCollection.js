import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase/config'

import { collection, getDocs, documentId, query, where } from 'firebase/firestore'


export const useColorsCollection = (persistSelectColors, colors) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect( () => {
        let store = collection(db, 'colors')
        setIsPending(true)

        const _getDocs = async () => new Promise((res, rej)=>{
            getDocs(store)
            .then(snapshot => {
                console.log(snapshot);
                let resp = []
                snapshot.docs.forEach(doc => {
                    resp.push({id: doc.id, ...doc.data()})
                })
                res(resp)
            })
            .catch(err => {
                console.log(err)
                rej('could not fetch data: ', err)
            })
        });
        

        if(persistSelectColors){
            if(colors){
                store = query(store, where(documentId(), "in", colors))
                getDocs(store)
                .then(snapshot => {
                    console.log(snapshot);
                    let resp = []
                    snapshot.docs.forEach(doc => {
                        resp.push({id: doc.id, ...doc.data()})
                    })
                    setDocuments(resp)
                })
                .catch(err => {
                    console.log(err)
                    setError('could not fetch data: ', err)
                })
            }
        }else{
            getDocs(store)
            .then(snapshot => {
                console.log(snapshot);
                let resp = []
                snapshot.docs.forEach(doc => {
                    resp.push({id: doc.id, ...doc.data()})
                })
                setDocuments(resp)
            })
            .catch(err => {
                console.log(err)
                setError('could not fetch data: ', err)
            })
        }

        

        setIsPending(false)
        setError(null)

        // return () => unsub()
    }, [colors, persistSelectColors]);

    return { documents, isPending, error }
}
