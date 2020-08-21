#Object Oriented Messaging

Following the original pattern of Object Oriented Programming
proposed by Allan Kay:

1. EverythingIsAnObject.
2. Objects communicate by sending and receiving messages (in terms of objects).
3. Objects have their own memory (in terms of objects).
4. Every object is an instance of a class (which must be an object).
5. The class holds the shared behavior for its instances (in the form of objects in a program list)
6. To eval a program list, control is passed to the first object and the remainder is treated as its message.

I decided to create a quick prototype of an api based on a event/messages communication system between components(classes) trying to follow all the rules/principles originally explained by Alan Kay with modern javascript/typescript

The last two principles are kind of difficult to accomplish with javascript/typescript due to the fact that are native
features of languages as SmallTalk

To make this example, I took a lot of ideas from the Channels feature in C#

---

#####This style of programming basically solve a big Issue with the actual OOP:
####highly coupled, related and extended/implemented classes and interfaces

In a big production environment, this creates a snowball effect, the bigger your project/app, the bigger the relation between
classes and interfaces, so, when the time comes to change a feature in a highly used and implemented
interface, a lot of changes have to be made in the classes that implement that interface.

##Example explanation:  
For this case, I created an API prototype with node.js/express/typescript
as you can see, in the Controller Class and Service Class, there's totally decoupling between them but,
the classes still able to communicate and transfer data via messages.

For example, in this case the controller class emits a message received from a POST request sent to the server, the message also emits an event.
The service class will be able to pick up that message(specifically directed to that service) from the GlobalMessagingPool and
compute, maintain the state or persist the data passed via the message, at the end of the process, the server will be able to send a response related to that operation to the client, without knowing the existen of that result producer(class).

All the messages are passed to a GlobalMessagingPool wich provides with a kind of 'global state' the application. all the Business logic should be encapsulated in each class.

#wikipedia Extract:
The state an object holds is always private to that object. Other objects can query or change that state only by sending requests (messages) to the object to do so. Any message can be sent to any object: when a message is received, the receiver determines whether that message is appropriate. Alan Kay has commented that despite the attention given to objects, messaging is the most important concept in Smalltalk: "The big idea is 'messaging'—that is what the kernel of Smalltalk/Squeak is all about (and it's something that was never quite completed in our Xerox PARC phase).
[wikipedia](https://en.wikipedia.org/wiki/Smalltalk)

It's really important to emphasize early planning of the Message Schema that will be consumed and provided between classes, each message should have the posibility to be changable, persist the previous data and insert new data in each message(deep copy).

This code is also highly Testable beacuse there's no depedency at all between classes.

As I said, this is a prototype, probably with a lot of mistakes, not even close to production, however, is following the principle of total isolation
based on messages and events(Each class should be totally independent and be completely anonymous to the other classes, as a single processing unit).

###Original OOP Model, Highly related classes and interfaces
![image1](/images/image1.jpg "OOP")

###Model inspired by the OOP concept proposed by Alan Kay (Broker it's optional)
![image2](/images/newpatern.jpg "REALOOP")

##Example of a POST request sent to the server with the response of that task(conext)
![image3](/images/request.png "example")
