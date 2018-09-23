import { GROUP_OPEN_TOGGLED, CLOSE_GROUP, OPEN_GROUP, UPDATE_SIBLINGS, DISPLAY_BUTTONS, START_ADDING, FINISH_EDITING, START_EDITING } from '../actionTypes'
import { accessDenied } from './authActions'

import localServerURL from '../localServerURL'

const getGroupsUrl = localServerURL + '/getGroups'
const addGroupUrl = localServerURL + '/addGroup'
const updateGroupUrl = localServerURL + '/updateGroup'
const deleteGroupUrl = localServerURL + '/deleteGroup'

export function groupOpenToggle(groupId, open, sessionId) {
    return (dispatch) => {
        if (open) {
            dispatch(closeGroup(groupId))
        } else {
            dispatch(openGroup(groupId))
            fetch(getGroupsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'SessionId': sessionId
                },
                body: JSON.stringify({
                    parent: groupId,
                })	
            })
            .then((response) => { 
                if (!response.ok) {
                    dispatch(accessDenied())
                } else {
                    return response
                } 
            })
            .then((response) => response.json())
            .then((parsedResponse) => {
                handleGroupSiblingsResponse(parsedResponse, groupId, dispatch)    
            })
            .catch((err) => {console.log(err)})
        }
   }
}

function handleGroupSiblingsResponse(parsedResponse, parentId, dispatch) {
    if (parsedResponse.groups != undefined) {
        parsedResponse.groups.map( (group) => {
            group.open = false
            group.displayButtons = false
            group.groups = []
        } )
        dispatch(updateSiblings(parentId, parsedResponse.groups))
    } 
}

export function displayButtons(groupId) {
    return {type: DISPLAY_BUTTONS, payload: groupId}
}

export function startAdding(parentGroup) {
    return {type: START_ADDING, payload: parentGroup}
}

export function startEditing(group) {
    return {type: START_EDITING, payload: group}
}

export function finishEditing() {
    return {type: FINISH_EDITING}
}

export function confirmEditing(group, sessionId) {
    return (dispatch) => {
        let url = group.id ? updateGroupUrl : addGroupUrl
        dispatch(finishEditing())
        dispatch(openGroup(group.parent))
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'SessionId': sessionId,
            },
            body: JSON.stringify({
                parent: group.parent,
                name: group.name,
                id: group.id
            })	
        })
        .then((response) => { 
            if (!response.ok) {
                dispatch(accessDenied())
                return Promise.reject()
            } else {
                return response
            } 
        })
        .then((response) => response.json())
        .then((parsedResponse) => {
            handleGroupSiblingsResponse(parsedResponse, group.parent, dispatch)    
        })
        .catch((err) => {console.log(err)})
    }
}

export function updateSiblings(groupId, siblings) {
    return {type: UPDATE_SIBLINGS, payload: {groupId, siblings}}
}

export function closeGroup(groupId) {
    return {type: CLOSE_GROUP, payload: groupId}
}

export function openGroup(groupId) {
    return {type: OPEN_GROUP, payload: groupId}
}

export function deleteGroup(groupId, parentId, sessionId) {
    return (dispatch) => {
        fetch(deleteGroupUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'SessionId': sessionId,
            },
            body: JSON.stringify({
                parent: parentId,
                id: groupId
            })	
        })
        .then((response) => { 
            if (!response.ok) {
                dispatch(accessDenied())
                return Promise.reject()
            } else {
                return response
            } 
        })
        .then((response) => response.json())
        .then((parsedResponse) => {
            handleGroupSiblingsResponse(parsedResponse, parentId, dispatch)    
        })
        .catch((err) => {console.log(err)})   
    }
    return {type: OPEN_GROUP, payload: groupId}
}