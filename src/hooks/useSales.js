import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { Timestamp } from 'firebase/firestore'

import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'


export const useSales = (selectedMonth) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect( () => {
        let unsub = () => {}
        // console.log(selectedMonth);

        try {
            let store = collection(db, "sales")
            setIsPending(true)

            store = query(store, where("createdAt", ">=", Timestamp.fromMillis( new Date(selectedMonth.first).setHours(0,0,0) )))
            store = query(store, where("createdAt", "<=", Timestamp.fromMillis( new Date(selectedMonth.last).setHours(23,59,59) )))
            store = query(store, orderBy("createdAt", "desc"))

            
            unsub = onSnapshot(store, snapshot => {
                let res = []
                snapshot.docs.forEach(doc => {
                    res.push({id: doc.id, ...doc.data()})
                })
                setDocuments(res)
            }, err => {
                console.log(err)
                setError('could not fetch data: ', err)
            })

            setIsPending(false)
            setError(null)
        } catch (error) {
            setIsPending(false)
            setError(error.message)
        }

        return () => unsub()
    }, [selectedMonth]);

    return { documents, isPending, error }
}
