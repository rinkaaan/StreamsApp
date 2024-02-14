WORKPLACE="$HOME/workplace/Streams"

WORKSPACE="$WORKPLACE/StreamsApi"

(
  cd "$WORKSPACE"
  ./scripts/gen.sh
)

WORKSPACE="$WORKPLACE/StreamsApp"
SCHEMA_PATH="$WORKPLACE/StreamsApi/api/openapi.yaml"

(
  cd "$WORKSPACE"
  rm -rf openapi-client
  npx openapi -i "$SCHEMA_PATH" -o openapi-client
)
