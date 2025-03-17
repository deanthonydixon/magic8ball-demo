import json
import boto3
import random

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Magic8BallResponses')

def lambda_handler(event, context):
    # Get all items from the table
    response = table.scan()
    items = response.get('Items', [])
    
    if not items:
        return {
            'statusCode': 500,
            'body': json.dumps('No responses found in the database.')
        }

    # Pick a random response
    magic_response = random.choice(items)['response']

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps({'message': magic_response})
    }
