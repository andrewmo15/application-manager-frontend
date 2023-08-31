export default class APIService {

    /*========== Individual Applications API Methods ==========*/
    // POST /applications
    static postApplications(token, user_id, company, position, status) {
        return fetch(process.env.REACT_APP_API_URL + 'applications/', {
            'method': "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({"user_id": user_id, "company": company, "position": position, "status": status})
        }).then(response => {
            if (response.ok) return null
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    // GET /applications/id
    static getApplication(token, id) {
        return fetch(process.env.REACT_APP_API_URL + 'applications/' + id, {
            'method': "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,
            }
        }).then(response => response.json())
    }
    // PUT /applications/id
    static updateApplication(token, id, user_id, company, position, status) {
        return fetch(process.env.REACT_APP_API_URL + 'applications/' + id + "/", {
            'method': "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({"user_id": user_id, "company": company, "position": position, "status": status})
        }).then(response => {
            if (response.ok) return null
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    // DELETE /applications/id
    static deleteApplication(token, id) {
        return fetch(process.env.REACT_APP_API_URL + 'applications/' + id + "/", {
            'method': "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,
            },
        }).then(response => {
            if (response.ok) return null
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    /*========== User Info API Methods ==========*/
    // POST /users/
    static createUser(email, token, email_type) {
        return fetch(process.env.REACT_APP_API_URL + 'users/', {
            'method': "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                "email": email,
                "last_refresh": "2001-01-01", 
                "email_type": email_type,
            })
        }).then(response => response.json())
    }
    // GET /users/email
    static getUserDetails(user_id, token) {
        return fetch(process.env.REACT_APP_API_URL + 'users/' + user_id, {
            'method': "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        }).then(response => response.json())
    }
    // PUT /users/email
    static updateUserDetails(user_id, email, token, last_refresh, email_type) {
        return fetch(process.env.REACT_APP_API_URL + 'users/' + user_id + "/", {
            'method': "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                "email": email,
                "last_refresh": last_refresh, 
                "email_type": email_type,
            })
        }).then(response => {
            if (response.ok) return null
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }

    /*========== User Applications API Methods ==========*/
    // GET /userApplications/user_id
    static getUserApplications(user_id, token) {
        return fetch(process.env.REACT_APP_API_URL + 'userApplications/' + user_id, {
            'method': "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token,
            }
        }).then(response => response.json())
        .then(response => response["applications"])
    }
    // GET /newApplications/user_id
    static getNewApplications(user_id, token) {
        return fetch(process.env.REACT_APP_API_URL + 'newApplications/' + user_id, {
            'method': "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token,
                }
        }).then(response => response.json())
        .then(response => response['newApplications'])
    }
    
     /*========== Helper Methods ==========*/
    static errorHandler(error) {
        return error.json().then(error => {
            if ("non_field_errors" in error) {
                return {"error": error["non_field_errors"]}
            } else {
                let rtn = "Please fix the following errors:<br>"
                for (const [key, value] of Object.entries(error)) {
                    rtn += "- " + key.charAt(0).toUpperCase() + key.slice(1) + ": " + value + "<br>"
                }
                return {"error": rtn}
            }
        })
    }

    static getEmailFromToken(token) {
        return fetch(process.env.REACT_APP_GOOGLE_API_URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(content => content.email)
    }
}