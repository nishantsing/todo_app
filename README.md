# REST-API-Flask-Server-Beginners

> ### API stands for Application Programming Interface. So in order to interact with application, there are some rules & regulations (protocols) need to be followed by API designers. For that some request methods are defined in API Nomenclature which define the task they are dedicated for & hence the third party users will know about request URL & it's usage.

REST API Request Method | Dedicated Behaviour/task
------------ | -------------
GET | Retrieve resource data
POST | Insert resource data
PUT | Replace resource data
PATCH | Modify resource data
DELETE | Delete resource data

>> * There are only **2** HTTP methods.
>>    * **GET** (Default)
>>    * **POST**

* #### So, REST API Request Method only specifies the type of request current URL is capable to perform ie. shows specific behaviour.
* #### PUT, PATCH, DELETE aren't actually the HTTP methods but the REST API nomenclature request methods.
* #### GET is default HTTP method. So, request sent with no/any method(even PUT, PATCH, DELETE) except POST is GET.
* #### GET shows request parameters as optional arguments inside URL unlike POST which doesn't show request parameters inside URL.
