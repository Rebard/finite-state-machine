class FSM {
    constructor(config) {
		if(config == null)
			return throws("config is'nt passed");
		 this.initial = config.initial;
		 this.activeState = config.initial;
		 this.states = config.states;
		 
		 this.flag_success = false;
		 this.flag_redo = false;
		 this.history = [this.initial];	 
		 this.index = 0;
	}

    getState() {
		return this.activeState;
	}

    changeState(state) {
		if(state in this.states)
		{
			//this.history[this.index++] = this.activeState;
			this.activeState = state; 
			this.index++;
			this.history[this.index] = this.activeState;
			this.flag_success = true;
		}
		else
			return throws("state don't exist");
	}

    trigger(event) {
		if(event in this.states[this.activeState].transitions)
		{
			this.activeState = this.states[this.activeState].transitions[event];
			this.index++;
			this.history[this.index] = this.activeState;
			this.flag_success = true;
		}
		else throws("event don't exist");
	}

    reset() {
		this.activeState = this.initial;
	}

    getStates(event) {
		var arr = [];
		if(event == null)
		{
			for(var i in this.states)
				arr.push(i);
		}
		else
		{
			for(var i in this.states)
			{
				if(this.states[i].transitions[event] != undefined)
					arr.push(i);
			}		
		}
		return arr;
	}

    undo() {
		console.log(this.history);
		//if(this.activeState == this.initial)
			if(this.history[this.index - 1] == undefined)
				return false;
		this.index--;
		this.activeState = this.history[this.index];
		if(this.flag_success)
		{
			this.flag_redo = true;
			this.flag_success = false;
			return true;
		}
	}

    redo() {
		console.log(this.history);
		if(!this.flag_redo)
		{
			this.flag_redo = false;
			return false;
		}
		this.index++;
		if(this.history[this.index] == undefined)
			return false;
		this.activeState = this.history[this.index];
		this.flag_success = true;
		if(this.flag_success)
		{
			this.flag_success = false;
			return true;
		}
		
	}

    clearHistory() {
		this.history = [];
		this.index = 0;
	}
}

module.exports = FSM;

