export default class APIService {

    /*========== Authentication API Methods ==========*/
    // POST /users
    static signUpUser(username, password) {
        return fetch('http://localhost:8000/users/', {
            'method': "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': username, "password": password})
        }).then(response => {
            if (response.ok) return response.json();
            return this.errorHandler(response)
        }).then(response => {
            if ("error" in response) {
                throw new Error(response["error"])
            } else {
                return response["id"]
            }
        })
    }
    // POST /auth
    static loginUser(username, password) {
        return fetch('http://localhost:8000/auth/', {
            'method': "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': username, "password": password})
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return this.errorHandler(response)
        }).then(response => {
            if ("token" in response) {
                return response["token"]
            } else {
                throw new Error(response["error"])
            }
        })
    }
    // DELETE /users/id
    static deleteUser(id) {
        return fetch('http://localhost:8000/users/' + id, {
            'method': "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /*========== Individual Applications API Methods ==========*/
    // POST /applications
    static postApplications(token, username, company, position, status) {
        return fetch('http://localhost:8000/applications/', {
        'method': "POST",
          headers: {
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
          },
          body: JSON.stringify({"username": username, "company": company, "position": position, "status": status})
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    // GET /applications/id
    static getApplication(token, id) {
        return fetch('http://localhost:8000/applications/' + id, {
        'method': "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        }).then(response => {
            if (response.ok) return response.json();
            return this.errorHandler(response)
        }).then(response => {
            if ("error" in response) {
                throw new Error(response["error"])
            } else {
                return response
            }
        })
    }
    // PUT /applications/id
    static updateApplication(token, id, username, company, position, status) {
        return fetch('http://localhost:8000/applications/' + id + "/", {
            'method': "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({"username": username, "company": company, "position": position, "status": status})
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    // DELETE /applications/id
    static deleteApplication(token, id) {
        return fetch('http://localhost:8000/applications/' + id + "/", {
            'method': "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    /*========== User Info API Methods ==========*/
    // POST /userinfo/
    static addUserDetails(username, token, email, last_refresh, imapPassword, imapURL) {
        return fetch('http://localhost:8000/userinfo/', {
            'method': "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'username': username,
                "email": email,
                "last_refresh": last_refresh, 
                "imap_password": imapPassword, 
                "imap_url": imapURL
            })
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    // GET /userinfo/username
    static getUserDetails(username, token) {
        return fetch('http://localhost:8000/userinfo/' + username, {
            'method': "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        }).then(response => {
            if (response.ok) return response.json();
            return this.errorHandler(response)
        }).then(response => {
            if ("error" in response) {
                throw new Error(response["error"])
            } else {
                return response
            }
        })
    }
    // PUT /userinfo/username
    static updateUserDetails(username, token, email, last_refresh, imapPassword, imapURL) {
        return fetch('http://localhost:8000/userinfo/' + username + "/", {
            'method': "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'username': username,
                'email': email,
                "last_refresh": last_refresh, 
                "imap_password": imapPassword, 
                "imap_url": imapURL
            })
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }

    // DELETE /userinfo/username
    static deleteUserDetail(username, token) {
        return fetch('http://localhost:8000/userinfo/' + username + "/", {
            'method': "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        }).then(response => {
            if (response.ok) return null;
            return this.errorHandler(response)
        }).then(error => {
            if (error != null) {
                throw new Error(error["error"])
            }
        })
    }
    /*========== User Applications API Methods ==========*/
    // GET /userApplications/username
    static getUserApplications(username, token) {
        return fetch('http://localhost:8000/userApplications/' + username, {
            'method': "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        }).then(response => {
            if (response.ok) return response.json();
            return this.errorHandler(response)
        }).then(response => {
            if ("error" in response) {
                throw new Error(response["error"])
            } else {
                return response["applications"]
            }
        })
    }
    // GET /newApplications/username
    static getNewApplications(username, token) {
        return fetch('http://localhost:8000/newApplications/' + username, {
        'method': "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        }).then(response => response.json())
        .then(response => {
            if ("newApplications" in response) {
                return response["newApplications"]
            } else {
                throw new Error("Failed to get new applications. Make sure your IMAP password and email are correct or try again later.")
            }
        })
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

    static isValidPassword(pw) {
        return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 6;
    }
    
    static isValidEmail(email) {
        return String(email).toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
}