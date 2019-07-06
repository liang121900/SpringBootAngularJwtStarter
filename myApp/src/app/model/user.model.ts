import {NgForm,
    FormGroup,
        FormControl,
                Validators,
    FormBuilder } from '@angular/forms'
export class User{
	public username:String="visitor";
    public role:String="visitor";
    public token:String="";
    public userFormGroup: FormGroup;	
    constructor(){
        var _builder = new FormBuilder();
        this.userFormGroup = _builder.group({}); // Use the builder to create 
        // control --> validation
        // 1 control --> 1 validation
        this.userFormGroup.
        addControl("usernameFormControl",
                    new FormControl('',Validators.required)
        );

        this.userFormGroup.
        addControl("passwordFormControl",
                    new FormControl('',Validators.required)
        );
    }



}
