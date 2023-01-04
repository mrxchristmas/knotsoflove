import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase/config'

import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore'

// USAGE 
// useCollection('books', [['uid', '==', user.uid]], ["title", "desc"] )
// [['uid', '==', user.uid], ['title', '==', 'happy feet']] for where or _q
// [ ['title'], ['likes', 'asc' ] ] for orderby or _o
// l must be a number

// < less than
// <= less than or equal to
// == equal to
// > greater than
// >= greater than or equal to
// != not equal to
// array-contains
// array-contains-any
// in
// not-in
// https://firebase.google.com/docs/firestore/query-data/queries
// https://firebase.google.com/docs/firestore/query-data/order-limit-data


// might need to create new index if its a new orderBy query, see error message
export const useCollection = (c, _q, _o, l) => {
    const [documents, setDocuments] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const q = useRef(_q).current
    const o = useRef(_o).current

    useEffect( () => {
        let store = collection(db, c)
        setIsPending(true)

        if(q){
            q.forEach(qq => {
                store = query(store, where(...qq))
            })
        }
        if(o){
            o.forEach(oo => {
                store = query(store, orderBy(...oo))
            })
        }
        if(l){
            store = query(store, limit(l))
        }

        const unsub = onSnapshot(store, snapshot => {
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

        return () => unsub()
    }, [c, q, o, l]);

    return { documents, isPending, error }
}
