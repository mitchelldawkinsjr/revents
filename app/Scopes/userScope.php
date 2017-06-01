<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ScopeInterface;
use Illuminate\Support\Facades\Auth;

class userScope implements ScopeInterface
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('user_id', '=', Auth::id());
    }

    public function remove(Builder $builder, Model $model)
    {
        $query = $builder->getQuery();

        $column = $builder->getModel()->getQualifiedActivatedColumn();

        foreach ((array) $query->wheres as $key => $where)
        {
            if ($this->isActiveUsersConstraint($where, $column))
            {
                // Here SoftDeletingScope simply removes the where
                // but since we use Basic where (not Null type)
                // we need to get rid of the binding as well
                $this->removeWhere($query, $key);

                $this->removeBinding($query, $key);
            }
        }
    }

    /**
     * Remove scope constraint from the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  int  $key
     * @return void
     */
    protected function removeWhere($query, $key)
    {
        unset($query->wheres[$key]);

        $query->wheres = array_values($query->wheres);
    }

    /**
     * Remove scope constraint from the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  int  $key
     * @return void
     */
    protected function removeBinding($query, $key)
    {
        $bindings = $query->getRawBindings()['where'];

        unset($bindings[$key]);

        $query->setBindings(array_values($bindings));
    }

}