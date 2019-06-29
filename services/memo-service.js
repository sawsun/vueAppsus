import storageService from './storage.service.js'
import utilService from './util.service.js';

const KEY = 'memosKey';
var isDeletedByUser = false;

function memoQuery(filter = null) {

    return storageService.load(KEY)
        .then(memos => {
            if (!memos || !memos.length) {
                memos = creatInitialMemos();
                storageService.store(KEY, memos);
            }
            console.log('memo-service 15', filter);
            if (!filter) return memos;
            else return memos.filter(memo => memo.title.toUpperCase().includes(filter.byTitle.toUpperCase()))
                        .filter(memo => memo.type.toUpperCase().includes(filter.byType.toUpperCase()),

            )
        })
}


function getMemoById(memoId){
    return storageService.load(KEY)
    .then(memos =>{
        return memos.find(memo => memo.id === memoId);
    })
}

function deleteMemo(memoId){
    return storageService.load(KEY)
    .then(memos =>{
        let memoIdx = memos.findIndex(memo => memo.id === memoId);
        // console.log('memo here',memo);
        memos.splice(memoIdx,1);
        isDeletedByUser = !memos.length;
        return storageService.store(KEY,memos);
    })
}


function saveMemo(memo){
    return storageService.load(KEY)
    .then(memos =>{
        //updateing existed memo 
        if(memo.id){
            let memoIdx = memos.findIndex(currMmemo => currMmemo.id === memo.id)
            memos.splice(memoIdx,1,memo);
        }
        else{
            //Adding new
            memo.id = utilService.makeId();
            console.log('memo',memo);
            console.log('memos',memos);
            memos.push(memo);
        }
        return storageService.store(KEY,memos);
    })
}


function pinMemo(memoId) {
    return storageService.load(KEY)
    .then(memos =>{
        let memoIdx = memos.findIndex(memo => memo.id === memoId);
        let tempMemo = memos[memoIdx];
        memos.splice(memoIdx,1);
        memos.unshift(tempMemo);
        console.log('memos',memos)
        // storageService.store(KEY,memos);
        // memoQuery();
        return storageService.store(KEY,memos);
    })
}

export default{
    memoQuery,
    getMemoById,
    deleteMemo,
    saveMemo,
    pinMemo
}

function creatInitialMemos() {
    
     return isDeletedByUser ? []:
     [
        {
            id: utilService.makeId(),
            type:'memoText',
            title: 'Password',
            content: 'Change your gmail password though no one cares about you enough to hack your account',
            color: utilService.rndColor(),
            imgUrl : '',
            createdAt: utilService.getDate(1476835200000),
            isPinned : false,


        },
        {
            id: utilService.makeId(),
            type:'memoText',
            title: 'Cat food',
            content: 'Buy two bags of food for cat and put water on the scratches',
            color: utilService.rndColor(),
            imgUrl : '',
            createdAt: utilService.getDate(1487030400000),
            isPinned : false,

        },
        {
            id: utilService.makeId(),
            type:'memoTodo',
            title: 'Pay bills',
            todos:[{todo:'Get a job',isDone:false},{todo:'Get paid',isDone:false},{todo:'Pay bills',isDone:false}],
            color:  utilService.rndColor(),
            createdAt: utilService.getDate(1424304000000),
            isPinned : false,

        },
        {
            id: utilService.makeId(),
            type:'memoTodo',
            title: 'Sawsan\'s present',
            todos:[{todo:'Think of a gift',isDone:false},{todo:'Buy it',isDone:false}],
            color: utilService.rndColor(),
            createdAt: utilService.getDate(1476835200000),
            isPinned : false,

        },
        {
            id: utilService.makeId(),
            type:'memoText',
            title: 'Tamara\'s walk',
            content: 'Fresh air will be good for her!',
            color: utilService.rndColor(),
            imgUrl : '../img/sawtam.JPG',
            createdAt: utilService.getDate(1490562000000),
            isPinned : false,

        },
        {
            id: utilService.makeId(),
            type:'memoText',
            title: 'Vue.js',
            content: `Learn vue very well and die.
             If you think Vue will kill you, you're abviously right, 
             but I've heard that Angular would kill you twice, so chill and
             finish this sprint
            `,
            color: utilService.rndColor(), 
            imgUrl : '',
            createdAt: utilService.getDate(1509573600000),
            isPinned : false,

        },
    ]
}
