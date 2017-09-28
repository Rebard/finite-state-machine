class FSM {
    constructor(config) {
		if(config == null)
			return throws("config is'nt passed");
		 this.initial = config.initial;
		 this.activeState = config.initial;
		 this.states = config.states;
		 
		 this.flag_success = false;
		 this.flag_redo = false;
		 this.history = [];	 
		 this.index = 0;
	}

    getState() {
		return this.activeState;
	}

    changeState(state) {
		if(state in this.states)
		{
			this.history[this.index++] = this.activeState;
			this.activeState = state; 
			this.flag_success = true;
		}
		else
			return throws("state don't exist");
	}

    trigger(event) {
		if(event in this.states[this.activeState].transitions)
		{
			this.history[this.index++] = this.activeState;
			this.activeState = this.states[this.activeState].transitions[event];
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
		if(this.activeState == this.initial)
			return false;
	
		this.index --;
		this.flag_redo = true;
		this.activeState = this.history[this.index];
		if(this.flag_success)
		{
			this.flag_success = false;
			return true;
		}
		
	}

    redo() {
		if(this.activeState == this.initial || !this.flag_redo)
		{
			this.flag_redo = false;
			return false;
		}
				this.index++;
				this.activeState = this.history[this.index];
				if(this.flag_success)
					return true;
	}

    clearHistory() {
		this.history = [];
		this.index = 0;
	}
}

module.exports = FSM;

