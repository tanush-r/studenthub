import React from "react"

var UserProfile = (function() {
        var full_name = "";
      
        var getName = function(key) {
                return localStorage.getItem(key)
        };
      
        var setName = function(key, value) {
                localStorage.setItem(key, value)
        };

        var clearProfile = () => {
                localStorage.clear()
        }
      
        return {
          getName: getName,
          setName: setName,
          clearProfile: clearProfile
        }
      
      })();
      
export default UserProfile;