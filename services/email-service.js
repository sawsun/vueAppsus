import storageService from './storage.service.js'
import utilService from './util.service.js';

const KEY = 'emailKey';
var isDeletedByUser = false;

function emailQuery(filter = null) {

    return storageService.load(KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = _creatInitialEmails();
                storageService.store(KEY, emails);
            }
            if (filter === null || filter.byAll) return emails;
            else return emails.filter(email =>
                email.isRead && filter.byRead ||
                !email.isRead && filter.byUnRead)
        })
}

function emailSearchQuery(emails,searchSTR){
  if(!searchSTR) return emails;
  return emails.filter(email => email.subject.toUpperCase().includes(searchSTR.toUpperCase()));     
}

function saveEmailData(mailId){
    console.log('save this change ',mailId);
    var tempMail = {};
    
    return storageService.load(KEY)
        .then(emails => {
                var emailIdx = emails.findIndex(email => email.id === mailId);
                tempMail = emails[emailIdx];
                tempMail.isRead = true;
                emails.splice(emailIdx,1,tempMail);
            return storageService.store(KEY, emails);

        })
    }

function getEmailbyId(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var email = emails.find(email => email.id === emailId);
            return email;
        })
}

function getRead(){
    return emailQuery().then(res => {
        return res.reduce((acc, curreEmail) => acc + (+curreEmail.isRead), 0)
    })
}

function getAll(){
    return storageService.load(KEY)
    .then(emails => {
        return emails.length;
    })
}

function getUnRead(){
    return emailQuery().then(res => {
        return res.reduce((acc, curreEmail) => acc + (+!curreEmail.isRead), 0)
    })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            const emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            isDeletedByUser = !emails.length;
            return storageService.store(KEY, emails);
        })
}

function sendEmail(mail) {
    var newEmail = {
        id: utilService.makeId(),
        from: mail.from,
        subject: mail.subject,
        body: mail.body,
        isRead: false,
        date: utilService.getDate(+new Date()),
        sentAt: +new Date()
    }
    console.log('newEmail',newEmail);

    return storageService.load(KEY)
    .then(emails => {
            emails.push(newEmail);
        return storageService.store(KEY, emails);

    })
}

export default {
    emailQuery,
    getEmailbyId,
    deleteEmail,
    sendEmail,
    getAll,
    getRead,
    getUnRead,
    emailSearchQuery,
    saveEmailData
}

function _creatInitialEmails() {

    return isDeletedByUser ? [] : [{
            id: utilService.makeId(),
            from:'robertDeNiro@gmail.com',
            subject: 'are you talkin to me',
            body: 'Change your gmail password',
            isRead: true,
            date: utilService.getDate(+new Date('1970-09-19')),
            sentAt: +new Date('1970-09-19')

        },
        {
            id: utilService.makeId(),
            from:'billGates@apple.com',
            subject: 'what about my offer',
            body: 'Change your gmail password',
            isRead: false,
            date: utilService.getDate(+new Date('1978-09-19')),
            sentAt: +new Date('1978-09-19')

        },
        {
            id: utilService.makeId(),
            from:'steveJobs@microsoft.com',
            subject: 'waiting for your approval',
            body: 'Change your gmail password',
            isRead: false,
            date: utilService.getDate(+new Date('1977-09-19')),
            sentAt: +new Date('1977-09-19')

        },
        {
            id: utilService.makeId(),
            from:'alPacino@microsoft.com',
            subject: 'love you baby :*',
            body: 'Change your gmail password',
            isRead: true,
            date: utilService.getDate(+new Date('1982-09-19')),
            sentAt: +new Date('1982-09-19')

        },
        {
            id: utilService.makeId(),
            from:'robertDeNiro@gmail.com',
            subject: 'tonight my place',
            body: 'Change your gmail password',
            isRead: false,
            date: utilService.getDate(+new Date('1981-09-19')),
            sentAt: +new Date('1981-09-19')

        },
        {
            id: utilService.makeId(),
            from:'billGates@gmail.com',
            subject: 'excited about us start working together ',
            body: 'Change your gmail password',
            isRead: false,
            date: utilService.getDate(+new Date('1980-09-19')),
            sentAt: +new Date('1980-09-19')

        },
        {
            id: utilService.makeId(),
            from:'billGates@gmail.com',
            subject: 'Saw and Tamara you are amazing guys ',
            body: 'Change your gmail password',
            isRead: true,
            date: utilService.getDate(+new Date('1979-09-19')),
            sentAt: +new Date('1979-09-19')

        },
    ]
}
