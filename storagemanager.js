const StorageManager = {
    // Keys used for localStorage
    KEYS: {
        LISTS: 'todoApp_lists',
        TODOS: 'todoApp_todos',
        ACTIVE_LIST_ID: 'todoApp_activeListId',
        ACTIVE_FILTER: 'todoApp_activeFilter'
    },

    //Checks if localStorage is available
    isStorageAvailable: function() {
        try{
            const test = '__storage_test__';
            localStorage.setItem(test,test);
            localStorage.removeItem(test);
            return true;
        }catch (e){
            console.warn('localStorage is not available: ', e);
            return false;
        }
    },
    //Save data to localStorage with error handling
    saveToStorage: function(key, value){
        if(!this.isStorageAvailable()){
            console.warn('Cannot save to storage - using in-memory fallback');
            return false;
        }
        try {
            //Convert value to JSON string
            const jsonString = JSON.stringify(value);
            localStorage.setItem(key, jsonString);
            return true;
        }catch (e){
            //Handle quota exceeded or other errors
            console.warn('Failed to save storage: ', e);
            if(e.name === 'QuotaExceededError'){
                console.warn('Storage quota exceeded - consider clearing old data');
            }
            return false;
        }
    },
    
    //Load data from localStorage with error handling
    loadFromStorage: function(key){
        if(!this.isStorageAvailable()){
            return null;
        }

        try {
            const jsonString = localStorage.getItem(key);
            if(jsonString === null){
                return null;
            }
            //Parse JSON string back to object
            return JSON.parse(jsonString);
        } catch (e) {
            //Handle Malformed JSON
            console.warn('Failed to load from storage: ', e);
            console.warn('Clearing corrupted data for key: ', key);
            localStorage.removeItem(key);
            return nulll
        }
    },

    //Clear all app data from localStorage
    clearStorage: function(){
        if(!this.isStorageAvailable){
            return;
        }
        try{
            Object.values(this.KEYS).forEach(key =>{
                localStorage.removeItem(key);
            });
        }catch (e){
            console.warn('Failed to clear storage: ', e);
        }
    }
};