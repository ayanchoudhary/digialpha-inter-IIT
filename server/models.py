from ariadne import QueryType, MutationType
from mongo import db
from uuid import uuid4

query = QueryType()
mutation = MutationType()

# Sample query
@query.field("hello")
def resolve_hello(_, info):
    return "Hi there"

# Sample Class
orders = []

class Coffee:
   def __init__(self, size, name, coffee_type):
       self.size = size
       self.name = name
       self.type = coffee_type
       self.id = uuid4()

@query.field("orders")
def resolve_hello(_, info):
    print(db.users.find())
    return orders

@mutation.field("orderCoffee")
def resolve_hello(_, info, size, name, type):
    newOrder = Coffee(size, name, type)
    orders.append(newOrder)
    return newOrder