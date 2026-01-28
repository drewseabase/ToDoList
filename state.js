const State = {
    //Current application state
    data: {
        lists: [],
        todos: [],
        activeListId: null,
        activeFilter: 'all'
    },

    //Get current State
    getState: function(){
        return this.data;
    },

    //Update state
    setState: function(newState){
        this.data = {...this.data, ...newState};
    },

    //Reset state to initial values
    resetState: function(){
        this.data = {
            lists: [],
            todos: [],
            activeListId: null,
            activeFilter: 'all'
        };
    }
};